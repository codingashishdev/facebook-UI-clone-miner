import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

const Home = () => {
  return (
    <div className="py-5 px-4 md:px-[70px] bg-light-bgSoft dark:bg-dark-bgSoft min-h-screen mobile:p-[10px] tablet:p-5">
      {/* Welcome Section */}
      <div className="mb-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to SocialShare</h1>
        <p className="text-purple-100">Connect with friends and share your moments</p>
      </div>

      {/* Stories */}
      <div className="mb-5">
        <Stories />
      </div>

      {/* Share */}
      <div className="mb-5">
        <Share />
      </div>

      {/* Posts */}
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default Home;