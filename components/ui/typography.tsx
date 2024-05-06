import React, { forwardRef } from "react";
import { cn } from "../../lib/utils";

export const MarkdownHeader = ({ level, children }: any) => {
  switch (level) {
    case 1:
      return <H1>{children}</H1>;
    case 2:
      return <H2>{children}</H2>;
    case 3:
      return <H3>{children}</H3>;
    case 4:
      return <H4>{children}</H4>;
    default:
      return <H4>{children}</H4>;
  }
};

const H1 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h1
      {...props}
      ref={ref}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl [&:not(:first-child)]:mt-10",
        props.className,
      )}
    >
      {props.children}
    </h1>
  );
});

H1.displayName = "H1";
export { H1 };

const H2 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h2
      {...props}
      ref={ref}
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {props.children}
    </h2>
  );
});

H2.displayName = "H2";
export { H2 };

const H3 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h3
      {...props}
      ref={ref}
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {props.children}
    </h3>
  );
});

H3.displayName = "H3";
export { H3 };

const H4 = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>((props, ref) => {
  return (
    <h4
      {...props}
      ref={ref}
      className={cn(
        "mt-4 scroll-m-20 text-xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    >
      {props.children}
    </h4>
  );
});

H4.displayName = "H4";
export { H4 };

const Lead = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("text-xl text-muted-foreground", props.className)}
    >
      {props.children}
    </p>
  );
});

Lead.displayName = "Lead";
export { Lead };

const P = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}
    >
      {props.children}
    </p>
  );
});

P.displayName = "P";
export { P };

const Large = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("text-lg font-semibold", props.className)}
      >
        {props.children}
      </div>
    );
  },
);

Large.displayName = "Large";
export { Large };

const Small = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>((props, ref) => {
  return (
    <p
      {...props}
      ref={ref}
      className={cn("text-sm font-medium leading-none", props.className)}
    >
      {props.children}
    </p>
  );
});

Small.displayName = "Small";
export { Small };

const Muted = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return (
    <span
      {...props}
      ref={ref}
      className={cn("text-sm text-muted-foreground", props.className)}
    >
      {props.children}
    </span>
  );
});

Muted.displayName = "Muted";
export { Muted };

const InlineCode = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
  return (
    <code
      {...props}
      ref={ref}
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        props.className,
      )}
    >
      {props.children}
    </code>
  );
});

const InlineCodeMarkdown = (e: any) => {
  return <InlineCode>{e.content}</InlineCode>;
};

InlineCode.displayName = "InlineCode";
export { InlineCode, InlineCodeMarkdown };

const UnorderedList = forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>((props, ref) => {
  return (
    <ul
      {...props}
      ref={ref}
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", props.className)}
    >
      {props.children}
    </ul>
  );
});

UnorderedList.displayName = "UnorderedList";
export { UnorderedList };

const OrderedList = forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>((props, ref) => {
  return (
    <ol
      {...props}
      ref={ref}
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", props.className)}
    >
      {props.children}
    </ol>
  );
});

OrderedList.displayName = "OrderedList";
export { OrderedList };

export const MarkdownList = ({ ordered, children }: any) => {
  if (ordered) {
    return <OrderedList>{children}</OrderedList>;
  } else {
    return <UnorderedList>{children}</UnorderedList>;
  }
};

const Quote = forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>((props, ref) => {
  return (
    <blockquote
      {...props}
      ref={ref}
      className={cn("mt-6 border-l-2 pl-6 italic", props.className)}
    >
      {props.children}
    </blockquote>
  );
});

Quote.displayName = "Quote";
export { Quote };

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>((props, ref) => {
  return (
    <table
      {...props}
      ref={ref}
      className={cn("w-full border-collapse table-auto", props.className)}
    >
      {props.children}
    </table>
  );
});

Table.displayName = "Table";
export { Table };

const Tr = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>((props, ref) => {
  return (
    <tr
      {...props}
      ref={ref}
      className={cn("m-0 border-t p-0 even:bg-muted", props.className)}
    >
      {props.children}
    </tr>
  );
});

Tr.displayName = "Tr";
export { Tr };
