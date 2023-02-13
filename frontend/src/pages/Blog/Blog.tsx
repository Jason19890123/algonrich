import React from "react";

const BlogItem = () => {
    return (
        <div className="w-full h-[200px] bg-[#131740] relative px-[20px] py-[20px] rounded-[4px]">
            <div class></div>
        </div>
    );
}

const Blog = () => {
  return (
    <div className="container px-[150px] py-[200px] ">
      <div
        style={{
          background: "url('assets/images/bread-bg1.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-[100%] rounded-[5px] h-[400px] py-[130px] px-[50px]"
      >
        <p className="text-[42px] leading-[50px] font-nunito text-left font-bold font-josefin">
          Latest news
        </p>
        <p className="pt-[30px] text-[16px] font-normal text-left py-[15px]">
          Home / Latest News
        </p>
      </div>

      <div className="grid grid-cols-2 gap-[30px] mt-[50px]">
        <BlogItem/>
        <BlogItem/>
      </div>
    </div>
  );
};

export default Blog;
