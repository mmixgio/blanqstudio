import Link from "next/link";
import type { ComponentProps } from "react";

/**
 * Link interno del sito con lo scroll automatico di Next disattivato.
 *
 * Lo scroll-to-top nativo scatterebbe mentre la pagina vecchia è ancora
 * visibile (in piena exit animation), causando un salto di viewport.
 * Lo scroll viene invece orchestrato da PageTransition in `onExitComplete`,
 * quando lo schermo è "vuoto" tra le due pagine.
 */
export default function TransitionLink(props: ComponentProps<typeof Link>) {
  return <Link scroll={false} {...props} />;
}
