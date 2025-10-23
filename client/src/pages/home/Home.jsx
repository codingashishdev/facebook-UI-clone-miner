import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"

const Home = () => {
    return (
        <div className="py-5 px-[70px] bg-light-bgSoft dark:bg-dark-bgSoft min-h-screen mobile:p-[10px] tablet:p-5">
            <Stories />
            <Share />
            <Posts />
        </div>
    )
}

export default Home