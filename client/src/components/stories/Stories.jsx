import { useContext } from "react";
import { AuthContext } from "../../context/authContext"

const Stories = () => {

  const {currentUser} = useContext(AuthContext)

  //TEMPORARY
  const stories = [
    {
      id: 1,
      name: "John Smith",
      img: "https://images.pexels.com/photos/13916254/pexels-photo-13916254.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      id: 2,
      name: "Don Bradman",
      img: "https://images.pexels.com/photos/19515490/pexels-photo-19515490/free-photo-of-black-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      name: "Steave Smith",
      img: "https://images.pexels.com/photos/3786208/pexels-photo-3786208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      name: "Alen Border",
      img: "https://images.pexels.com/photos/3643592/pexels-photo-3643592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div className="flex gap-[10px] h-[250px] mb-[30px] mobile:h-[50px] mobile:mb-0 mobile:justify-between tablet:h-[150px] tablet:gap-5">
      <div className="flex-1 rounded-[10px] overflow-hidden relative mobile:flex-none mobile:w-[50px] mobile:h-[50px] mobile:rounded-full">
          <img src={currentUser.profilePic} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-[10px] left-[10px] text-white font-medium mobile:hidden">{currentUser.name}</span>
          <button className="absolute bottom-10 left-[10px] text-white bg-[#5271ff] border-none rounded-full w-[30px] h-[30px] cursor-pointer text-[30px] flex items-center justify-center mobile:left-0 mobile:right-0 mobile:top-0 mobile:bottom-0 mobile:m-auto">+</button>
        </div>
      {stories.map(story=>(
        <div className="flex-1 rounded-[10px] overflow-hidden relative mobile:flex-none mobile:w-[50px] mobile:h-[50px] mobile:rounded-full" key={story.id}>
          <img src={story.img} alt="" className="w-full h-full object-cover" />
          <span className="absolute bottom-[10px] left-[10px] text-white font-medium mobile:hidden">{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Stories