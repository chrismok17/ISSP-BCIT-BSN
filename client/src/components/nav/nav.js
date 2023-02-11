//shared component that inserts common content on all pages (eg. nav bar)
// import "./nav.css";
//import Posts from "./posts.js";
// import Button from "@mui/material/Button";
// import MultilineTextFields from "./new_posts.js";

//button; onClick={showPosts}
const Nav = () => {
  return (
    <>
      <div class="container">
        <div class="header clearfix">
          <nav id="navbar">
            <img class="logo" src="bcit_logo.png" alt="BCIT logo"></img>
            <div class="btn announcement">
              <button>
                <img
                  // class="icon"
                  src="announcement_image.png"
                  alt="announcement_image"
                  // onClick={<Posts />}
                />
              </button>
            </div>
            <div class="btn home">
              <button>
                <img
                  // class="icon"
                  src="home_image.png"
                  alt="home_image"
                  // onClick={this.myfunction}
                />
              </button>
            </div>
          </nav>

          <h3 class="text-muted">React Blog App</h3>
        </div>
      </div>
    </>
  );
};

export default Nav;
