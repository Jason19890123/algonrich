import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import ReactPaginate from "react-paginate";
import "./Blog.scss"

const BlogItem: React.FC<{
  blogContent: string;
  imgSrc: string;
}> = ({ blogContent, imgSrc }) => {
  return (
    <div className="w-full bg-[#131740] relative px-[20px] py-[20px] rounded-[4px]">
      <div className="float-left w-[100%] lg:w-[40%] relative">
        <img className="" src={imgSrc}></img>
        <div className="absolute top-[40%] w-[100px] h-[30px] left-[-10px] px-[3px] py-[5px] bg-[#FF06B7]">15 May, 20</div>
      </div>
      <div className="float-right w-[100%] lg:w-[60%] py-[20px] lg:px-[30px] lg:py-0">
        <div className="text-left">
          <FontAwesomeIcon className="text-[#FF06B7] pr-[10px]" icon={solid("user")} />
          Admin
          <FontAwesomeIcon className="text-[#FF06B7] px-[10px]" icon={solid("comment")} />
          16
        </div>
        <div className="mt-[15px]">
          <a><p className="text-[22px] text-left">{blogContent}</p></a>
        </div>
        <div className="mt-[15px]">
          <a><p className="blog-btn text-[22px] text-left">Read more<FontAwesomeIcon icon={['fab', 'microsoft']} /></p></a>
        </div>
      </div>
    </div>
  );
}

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);

  let blogData = [];
  blogData = [{ blogContent: "Creative design clients response is better", imgSrc: "assets/images/b1.jpg" },
  { blogContent: "Make sure the prototype looks finished by.", imgSrc: "assets/images/b2.jpg" },
  { blogContent: "Designer have to make sure the prototype looks", imgSrc: "assets/images/b3.jpg" },
  { blogContent: "Creative design clients response is better", imgSrc: "assets/images/b4.jpg" },
  { blogContent: "Make sure the prototype looks finished by.", imgSrc: "assets/images/b5.jpg" },
  { blogContent: "Designer have to make sure the prototype looks", imgSrc: "assets/images/b6.jpg" },

  { blogContent: "Creative design clients response is better", imgSrc: "assets/images/b5.jpg" },
  { blogContent: "Creative design clients response is better", imgSrc: "assets/images/b4.jpg" },
  { blogContent: "Creative design clients response is better", imgSrc: "assets/images/b3.jpg" },
  { blogContent: "Creative design clients response is better", imgSrc: "assets/images/b2.jpg" },
  { blogContent: "Creative design clients response is better", imgSrc: "assets/images/b1.jpg" },];

  const handlePageClick = (selectedItem: { selected: number }) => {
    console.log("pageNum", selectedItem);
    setCurrentPage(selectedItem.selected);
  }

  return (
    <div className="py-[200px] px-[100px]">
      <div

        className="w-[100%] rounded-[5px] h-[400px] py-[130px] px-[50px] pageheader"
      >
        <p className="text-[42px] leading-[50px] font-nunito text-left font-bold font-josefin">
          Latest news
        </p>
        <p className="pt-[30px] text-[16px] font-normal text-left py-[15px]">
          Home / Latest News
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] mt-[50px]">
        {
          blogData.map((item, index) => {
            if (index >= 6 * currentPage && index < 6 * (currentPage + 1)) {
              return <BlogItem key={index} blogContent={item.blogContent} imgSrc={item.imgSrc} />;
            }
          })
        }
      </div>
      <ReactPaginate
        previousLabel={"Prev"}
        nextLabel={"Next"}
        pageCount={Math.ceil(blogData.length / 6)}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </div>
  );
};

export default Blog;
