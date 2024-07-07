import { Link } from "react-router-dom";

function SectionTitle({ text, link_to, link_text = "See More" }) {
  return (
    <div className="flex justify-between mt-12 md:mt-6 mb-6 font-semibold text-md text-secondary-normal">
      <p className=" text-white text-4xl font-semibold">{text}</p>
      {link_to && (
        <Link
          to={link_to}
          className="border border-secondary-dark px-3 py-2 h-fit rounded-xl hover:scale-105 transition-all"
        >
          {link_text}
        </Link>
      )}
    </div>
  );
}

export default SectionTitle;
