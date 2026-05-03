"use client";

import {
  KeyboardEvent,
  ReactNode,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { Button } from "./Button";

type TabItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  panel?: ReactNode;
};

type TabsProps = HTMLAttributes<HTMLDivElement> & {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  ariaLabel?: string;
  renderPanels?: boolean;
  tabClassName?: string;
  panelClassName?: string;
};

export function Tabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  ariaLabel = "Card view",
  renderPanels = true,
  className = "",
  tabClassName = "",
  panelClassName = "",
  ...props
}: TabsProps) {
  const componentId = useId();
  const enabledTabs = useMemo(() => tabs.filter((tab) => !tab.disabled), [tabs]);
  const initialValue = defaultValue ?? enabledTabs[0]?.value ?? tabs[0]?.value ?? "";
  const [internalValue, setInternalValue] = useState(initialValue);
  const activeValue = value ?? internalValue;
  const activeTab = tabs.find((tab) => tab.value === activeValue) ?? enabledTabs[0];
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectTab(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  function focusTab(nextIndex: number) {
    const nextTab = tabs[nextIndex];

    if (!nextTab || nextTab.disabled) {
      return;
    }

    tabRefs.current[nextIndex]?.focus();
    selectTab(nextTab.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const currentIndex = tabs.findIndex((tab) => tab.value === activeTab?.value);

    if (currentIndex === -1 || enabledTabs.length === 0) {
      return;
    }

    const enabledIndexes = tabs
      .map((tab, index) => (tab.disabled ? -1 : index))
      .filter((index) => index >= 0);
    const enabledPosition = enabledIndexes.indexOf(currentIndex);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      focusTab(enabledIndexes[(enabledPosition + 1) % enabledIndexes.length]);
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      focusTab(
        enabledIndexes[
          (enabledPosition - 1 + enabledIndexes.length) % enabledIndexes.length
        ],
      );
    }

    if (event.key === "Home") {
      event.preventDefault();
      focusTab(enabledIndexes[0]);
    }

    if (event.key === "End") {
      event.preventDefault();
      focusTab(enabledIndexes[enabledIndexes.length - 1]);
    }
  }

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")} {...props}>
      <div
        aria-label={ariaLabel}
        className="inline-flex w-full gap-1 rounded-full border border-brand-neutral-900 bg-brand-neutral-0 p-1 shadow-[1px_2px_0_0_var(--color-brand-neutral-900)]"
        onKeyDown={handleKeyDown}
        role="tablist"
      >
        {tabs.map((tab, index) => {
          const isActive = tab.value === activeTab?.value;
          const tabId = `${componentId}-${tab.value}-tab`;
          const panelId = `${componentId}-${tab.value}-panel`;

          return (
            <Button
              key={tab.value}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              aria-controls={renderPanels ? panelId : undefined}
              aria-selected={isActive}
              className={[
                "min-w-0 flex-1 whitespace-nowrap px-5 sm:px-8",
                tabClassName,
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={tab.disabled}
              id={tabId}
              onClick={() => selectTab(tab.value)}
              role="tab"
              tabIndex={isActive ? 0 : -1}
              variant={isActive ? "base-primary" : "base-secondary"}
            >
              {tab.label}
            </Button>
          );
        })}
      </div>

      {renderPanels
        ? tabs.map((tab) => {
            const isActive = tab.value === activeTab?.value;

            return (
              <div
                key={tab.value}
                aria-labelledby={`${componentId}-${tab.value}-tab`}
                className={[
                  "mt-4 text-preset-5-regular text-brand-neutral-900",
                  isActive ? "" : "hidden",
                  panelClassName,
                ]
                  .filter(Boolean)
                  .join(" ")}
                hidden={!isActive}
                id={`${componentId}-${tab.value}-panel`}
                role="tabpanel"
                tabIndex={0}
              >
                {tab.panel}
              </div>
            );
          })
        : null}
    </div>
  );
}
