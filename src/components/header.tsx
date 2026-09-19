import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { assets, navigation } from "../content/home";

export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function navigate(href: string) {
    dialog.current?.close();
    requestAnimationFrame(() => {
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      window.history.pushState(null, "", href);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    });
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Przejdź do treści
      </a>
      <div className="topbar">
        <div className="container">
          <span>Łyszkowice · województwo łódzkie</span>
          <div className="topbar-phones" aria-label="Telefony kontaktowe">
            <a href="tel:+48468388260">
              <Phone size={13} aria-hidden="true" />
              46 838 82 60
            </a>
            <a href="tel:+48603514312">
              <Phone size={13} aria-hidden="true" />
              603 514 312
            </a>
            <a href="tel:+48601514896">
              <Phone size={13} aria-hidden="true" />
              601 514 896
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#start" className="brand" aria-label="TOM-DAR — strona główna">
            <img src={assets.logo} alt="TOM-DAR" width="202" height="42" />
          </a>
          <nav className="desktop-nav" aria-label="Nawigacja główna">
            {navigation.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="menu-button"
            aria-label="Otwórz menu"
            aria-haspopup="dialog"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => {
              dialog.current?.showModal();
              setOpen(true);
            }}
          >
            <Menu />
          </button>
          <dialog
            ref={dialog}
            id="mobile-menu"
            className="mobile-sheet"
            aria-labelledby="mobile-menu-title"
            onClose={() => setOpen(false)}
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                const rect = event.currentTarget.getBoundingClientRect();
                if (
                  event.clientX < rect.left ||
                  event.clientX > rect.right ||
                  event.clientY < rect.top ||
                  event.clientY > rect.bottom
                )
                  dialog.current?.close();
              }
            }}
          >
            <div className="mobile-menu-heading">
              <h2 id="mobile-menu-title">Menu</h2>
              <button
                type="button"
                className="menu-button"
                aria-label="Zamknij menu"
                onClick={() => dialog.current?.close()}
              >
                <X />
              </button>
            </div>
            <nav aria-label="Nawigacja mobilna">
              {navigation.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(link.href);
                  }}
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
            <a className="button primary" href="tel:+48468388260">
              <Phone size={18} />
              46 838 82 60
            </a>
          </dialog>
        </div>
      </header>
    </>
  );
}
