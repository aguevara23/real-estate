import $ from 'jquery';

class MobileMenu {
  constructor() {
    this.menuIcon = $(".site-header__menu-icon");
    this.primaryNav = $(".primary-nav");
    this.navItem = $(".primary-nav a");
    this.navLogo = $(".site-header__logo");
    this.events();
  }

  events() {
    this.menuIcon.click(this.toggleMenu.bind(this));
    this.navItem.click(this.toggleMenu.bind(this));
    this.navLogo.click(this.hideMenu.bind(this));
  }

  hideMenu() {
    this.primaryNav.addClass("is-not-visible");
    this.menuIcon.removeClass("site-header__menu-icon--close-x")
  }

  toggleMenu() {
    this.primaryNav.toggleClass("is-not-visible");
    this.menuIcon.toggleClass("site-header__menu-icon--close-x");
  }
}

export default MobileMenu;
