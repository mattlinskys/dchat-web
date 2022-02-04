import React, { PropsWithChildren } from "react";

export interface DateBreakerProps<T> {
  items: T[];
  getItemDate: (item: T) => Date | string | number | undefined;
  getItemKey: (item: T) => any;
  renderItem: (item: T) => React.ReactNode;
  renderBreak: (localeDate: string) => React.ReactNode;
}

const DateBreaker = <T extends object>({
  items,
  getItemDate,
  getItemKey,
  renderItem,
  renderBreak,
}: PropsWithChildren<DateBreakerProps<T>>) => {
  let lastDate: string | null = null;

  return (
    <>
      {items.map((item) => {
        let dateBreak: string | null = null;
        const itemDateRaw = getItemDate(item);
        const itemDate =
          itemDateRaw !== undefined ? new Date(itemDateRaw) : itemDateRaw;
        const itemKey = getItemKey(item);

        if (itemDate && lastDate !== itemDate.toLocaleDateString()) {
          lastDate = dateBreak = itemDate.toLocaleDateString();
        }

        return (
          <React.Fragment key={itemKey}>
            {dateBreak && renderBreak(dateBreak)}
            {renderItem(item)}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default DateBreaker;
