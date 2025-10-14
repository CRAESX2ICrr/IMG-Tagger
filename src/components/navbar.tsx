import StaggeredMenu from "./StaggeredMenu";
export const Navbar = () => {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "Gallery", ariaLabel: "View your gallery", link: "/gallery" },
    { label: "SignUp", ariaLabel: "Create an Account", link: "/signup" },
    { label: "Login", ariaLabel: "Login to your account", link: "/login" },
  ];

  // const socialItems = [
  //   { label: "Twitter", link: "https://twitter.com" },
  //   { label: "GitHub", link: "https://github.com" },
  //   { label: "LinkedIn", link: "https://linkedin.com" },
  // ];

  return (
    <div className="">
      <StaggeredMenu
        position="right"
        items={menuItems}
        // socialItems={socialItems}
        displaySocials={false}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen={true}
        colors={["#B19EEF", "#5227FF"]}
        logoUrl="/path-to-your-logo.svg"
        accentColor="#ff6b6b"
        isFixed={true}
      />
    </div>
  );
};
