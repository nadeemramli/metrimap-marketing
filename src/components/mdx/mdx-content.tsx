/* eslint-disable react-hooks/static-components --
   This module's whole job is to turn a compiled-MDX string into a component at
   build time (SSG). The derived component is stable per article; the rule's
   remount concern doesn't apply to prerendered pages. */
import * as runtime from "react/jsx-runtime";
import Image, { type ImageProps } from "next/image";
import Link from "next/link";
import { Callout } from "./callout";

/**
 * Velite's s.mdx() compiles each article body to a function-body string. We
 * evaluate it against the React jsx-runtime to get the component. This runs at
 * build time during SSG (these pages are prerendered), so the component type is
 * effectively stable and there is no runtime `new Function` on the client.
 * Intentionally not a `use*` hook — it takes no reactive input.
 */
function getMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default as React.ComponentType<{
    components?: Record<string, React.ComponentType<unknown>>;
  }>;
}

const components: Record<string, React.ComponentType<never>> = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "#";
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className="font-medium underline-offset-4 hover:underline"
        >
          {props.children}
        </Link>
      );
    }
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline-offset-4 hover:underline"
      />
    );
  },
  img: (props: ImageProps) => (
    <Image
      {...props}
      alt={props.alt ?? ""}
      className="rounded-lg border border-border"
      sizes="(max-width: 768px) 100vw, 768px"
    />
  ),
  Callout,
} as unknown as Record<string, React.ComponentType<never>>;

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-semibold prose-a:font-medium">
      <Component components={components as Record<string, React.ComponentType<unknown>>} />
    </div>
  );
}
