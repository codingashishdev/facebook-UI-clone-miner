const RightBar = () => {
  return (
    <div className="flex-3 sticky top-[70px] h-[calc(100vh-70px)] overflow-scroll bg-light-bgSoft dark:bg-dark-bgSoft mobile:hidden tablet:hidden [&::-webkit-scrollbar]:hidden">
      <div className="p-5">
        <div className="shadow-[0px_0px_15px_1px_rgba(0,0,0,0.09)] p-5 mb-5 bg-light-bg dark:bg-dark-bg">
          <span className="text-gray-500">Suggestions For You</span>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-light-text dark:text-dark-text">Rahul</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <button className="border-none px-[5px] py-[5px] text-white cursor-pointer bg-[#5271ff]">follow</button>
              <button className="border-none px-[5px] py-[5px] text-white cursor-pointer bg-[#f0544f]">dismiss</button>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1822&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium text-light-text dark:text-dark-text">Ajay</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <button className="border-none px-[5px] py-[5px] text-white cursor-pointer bg-[#5271ff]">follow</button>
              <button className="border-none px-[5px] py-[5px] text-white cursor-pointer bg-[#f0544f]">dismiss</button>
            </div>
          </div>
        </div>
        <div className="shadow-[0px_0px_15px_1px_rgba(0,0,0,0.09)] p-5 mb-5 bg-light-bg dark:bg-dark-bg">
          <span className="text-gray-500">Latest Activities</span>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-light-textSoft dark:text-dark-textSoft">
                <span className="font-medium text-light-text dark:text-dark-text">Smith</span> changed their cover picture
              </p>
            </div>
            <span className="text-gray-500">1 min ago</span>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/flagged/photo-1551373916-bdaddbf4f881?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-light-textSoft dark:text-dark-textSoft">
                <span className="font-medium text-light-text dark:text-dark-text">Alzman</span> changed their cover picture
              </p>
            </div>
            <span className="text-gray-500">1 min ago</span>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1539975611936-f0d1221cfd16?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-light-textSoft dark:text-dark-textSoft">
                <span className="font-medium text-light-text dark:text-dark-text">Mark</span> changed their cover picture
              </p>
            </div>
            <span className="text-gray-500">1 min ago</span>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5">
              <img
                src="https://images.unsplash.com/photo-1532490389938-2856e3f1560a?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-light-textSoft dark:text-dark-textSoft">
                <span className="font-medium text-light-text dark:text-dark-text">Shivam</span> changed their cover picture
              </p>
            </div>
            <span className="text-gray-500">1 min ago</span>
          </div>
        </div>
        <div className="shadow-[0px_0px_15px_1px_rgba(0,0,0,0.09)] p-5 mb-5 bg-light-bg dark:bg-dark-bg">
          <span className="text-gray-500">Online Friends</span>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Ashish</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1590959651373-a3db0f38a961?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Jordan</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Anatoly</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Sohan</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1468971050039-be99497410af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Andre Fleture</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1710962184944-71cab934b562?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">aliees johnson</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1710875236077-24fdbe86b116?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Mark Boucher</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1710973087171-f697e4508567?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Tom moody</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1707343846292-0c11438d145f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Gibbs Brian</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Antose</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center gap-5 relative">
              <img
                src="https://images.unsplash.com/photo-1548602088-9d12a4f9c10f?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="w-3 h-3 rounded-full bg-lime-500 absolute top-0 left-[30px]" />
              <span className="font-medium text-light-text dark:text-dark-text">Ashish</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
