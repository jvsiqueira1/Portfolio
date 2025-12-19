"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const timelineItemVariants = cva("", {
  variants: {
    variant: {
      default: "text-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive",
      outline: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface TimelineProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  alternating?: boolean;
  alignment?: "top/left" | "bottom/right";
  horizItemSpacing?: number;
  horizItemWidth?: number;
  vertItemSpacing?: number;
  vertItemMaxWidth?: number;
  noCards?: boolean;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  (
    {
      className,
      orientation = "horizontal",
      alternating = true,
      alignment = "top/left",
      horizItemSpacing = 130,
      horizItemWidth = 220,
      vertItemSpacing = 130,
      vertItemMaxWidth = 350,
      noCards = false,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";
    const isHorizontal = orientation === "horizontal";

    const childrenArray = React.Children.toArray(children);
    const totalItems = childrenArray.length;

    // Calcular altura total da linha vertical
    const totalHeight =
      totalItems > 0
        ? (totalItems - 1) * vertItemSpacing + totalItems * 50 // altura aproximada por item
        : 0;

    const containerStyle: React.CSSProperties = isHorizontal
      ? {
          display: "flex",
          overflowX: "auto",
          paddingBottom: "1rem",
          scrollbarWidth: "thin",
        }
      : {
          position: "relative",
        };

    return (
      <div
        ref={ref}
        className={cn(
          "timeline-container relative",
          isVertical && "timeline-vertical",
          isHorizontal && "timeline-horizontal",
          className
        )}
        style={containerStyle}
        data-orientation={orientation}
        data-alternating={alternating}
        data-alignment={alignment}
        data-no-cards={noCards}
        {...props}
      >
        {/* Linha vertical - à esquerda no mobile quando não alterna, centralizada no desktop quando alterna */}
        {isVertical && (
          <div
            className={cn(
              "absolute top-0 w-0.5 bg-primary/30 z-0",
              alternating
                ? "left-1/2 -translate-x-1/2"
                : "left-4 md:left-1/2 md:-translate-x-1/2"
            )}
            style={{
              height: "100%",
              minHeight: totalHeight > 0 ? `${totalHeight}px` : "100%",
            }}
          />
        )}
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(
              child as React.ReactElement<TimelineItemProps>,
              {
                index,
                totalItems,
                orientation,
                alternating,
                alignment,
                horizItemSpacing,
                horizItemWidth,
                vertItemSpacing,
                vertItemMaxWidth,
                noCards,
              } as Partial<TimelineItemProps>
            );
          }
          return child;
        })}
      </div>
    );
  }
);
Timeline.displayName = "Timeline";

interface TimelineItemProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof timelineItemVariants> {
  hollow?: boolean;
  index?: number;
  totalItems?: number;
  orientation?: "horizontal" | "vertical";
  alternating?: boolean;
  alignment?: "top/left" | "bottom/right";
  horizItemSpacing?: number;
  horizItemWidth?: number;
  vertItemSpacing?: number;
  vertItemMaxWidth?: number;
  noCards?: boolean;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      className,
      variant = "default",
      hollow = false,
      index = 0,
      totalItems = 1,
      orientation = "vertical",
      alternating = true,
      alignment = "top/left",
      horizItemSpacing = 130,
      horizItemWidth = 220,
      vertItemSpacing = 130,
      vertItemMaxWidth = 350,
      noCards = false,
      children,
      ...props
    },
    ref
  ) => {
    const isVertical = orientation === "vertical";
    const isHorizontal = orientation === "horizontal";

    const getVariantStyles = () => {
      switch (variant) {
        case "secondary":
          return "bg-secondary/10 border-secondary/20 text-secondary-foreground";
        case "destructive":
          return "bg-destructive/10 border-destructive/20 text-destructive";
        case "outline":
          return "bg-transparent border-border text-foreground";
        default:
          return "bg-card border-border text-card-foreground";
      }
    };

    const dotVariantStyles = () => {
      switch (variant) {
        case "secondary":
          return "bg-secondary border-secondary";
        case "destructive":
          return "bg-destructive border-destructive";
        case "outline":
          return "bg-transparent border-border";
        default:
          return "bg-primary border-primary";
      }
    };

    const isLeft = isVertical
      ? alternating
        ? index % 2 === 0
        : alignment === "top/left"
      : false;

    const isLastItem = index === totalItems - 1;

    const itemStyle: React.CSSProperties = isHorizontal
      ? {
          minWidth: `${horizItemWidth}px`,
          marginRight: !isLastItem ? `${horizItemSpacing}px` : "0",
        }
      : {
          marginBottom: !isLastItem ? `${vertItemSpacing}px` : "0",
          position: "relative",
          width: "100%",
        };

    const cardClasses = noCards
      ? ""
      : cn("rounded-lg border p-4 shadow-sm", getVariantStyles());

    const contentStyle: React.CSSProperties =
      isVertical && alternating
        ? {
            maxWidth: `${vertItemMaxWidth}px`,
            marginLeft: isLeft ? "0" : "auto",
            marginRight: isLeft ? "auto" : "0",
          }
        : isVertical && !alternating
        ? {
            maxWidth: `${vertItemMaxWidth}px`,
            marginLeft: "auto",
            marginRight: "auto",
          }
        : {};

    return (
      <div
        ref={ref}
        className={cn(
          "timeline-item relative",
          isVertical && "timeline-item-vertical",
          isHorizontal && "timeline-item-horizontal",
          className
        )}
        style={itemStyle}
        data-variant={variant}
        data-hollow={hollow}
        data-index={index}
        {...props}
      >
        {isVertical && alternating && (
          <>
            {/* Dot centralizado na linha vertical do container e verticalmente no meio do card (desktop) */}
            <div
              className={cn(
                "absolute z-10 h-4 w-4 rounded-full border-2 transition-colors flex-shrink-0",
                hollow ? "bg-background" : dotVariantStyles(),
                hollow && "border-2"
              )}
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}

        {isVertical && !alternating && (
          <>
            {/* Dot alinhado à esquerda (mobile) - verticalmente no meio do card */}
            <div
              className={cn(
                "absolute z-10 h-4 w-4 rounded-full border-2 transition-colors",
                hollow ? "bg-background" : dotVariantStyles(),
                hollow && "border-2"
              )}
              style={{
                left: "1rem", // left-4 = 1rem = 16px
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}

        {isHorizontal && (
          <>
            {/* Linha horizontal conectando os itens */}
            {!isLastItem && (
              <div
                className={cn(
                  "absolute top-0 left-full h-0.5 w-full",
                  dotVariantStyles(),
                  "opacity-30"
                )}
                style={{
                  width: `${horizItemSpacing}px`,
                  transform: "translateY(-50%)",
                }}
              />
            )}
            {/* Dot central */}
            <div
              className={cn(
                "absolute top-0 left-0 z-10 h-4 w-4 rounded-full border-2 transition-colors",
                hollow ? "bg-background" : dotVariantStyles(),
                hollow && "border-2"
              )}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}

        <div
          className={cn(
            "timeline-item-content",
            isVertical && alternating && (isLeft ? "pr-16" : "pl-16"),
            isVertical && !alternating && "pl-14",
            cardClasses
          )}
          style={contentStyle}
        >
          {children}
        </div>
      </div>
    );
  }
);
TimelineItem.displayName = "TimelineItem";

const TimelineItemDate = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { date?: Date | string }
>(({ className, date, children, ...props }, ref) => {
  const displayDate = date
    ? typeof date === "string"
      ? date
      : date.toLocaleDateString()
    : children;

  return (
    <div
      ref={ref}
      className={cn(
        "text-sm font-medium text-muted-foreground mb-1",
        className
      )}
      {...props}
    >
      {displayDate}
    </div>
  );
});
TimelineItemDate.displayName = "TimelineItemDate";

const TimelineItemTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-lg font-semibold text-foreground mb-2", className)}
      {...props}
    />
  );
});
TimelineItemTitle.displayName = "TimelineItemTitle";

const TimelineItemDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});
TimelineItemDescription.displayName = "TimelineItemDescription";

export {
  Timeline,
  TimelineItem,
  TimelineItemDate,
  TimelineItemDescription,
  TimelineItemTitle,
  timelineItemVariants,
};
