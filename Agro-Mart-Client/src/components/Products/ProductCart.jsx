import { FaHeart, FaCartPlus } from "react-icons/fa";

const ProductCart = ({ product }) => {
  const { name, image, price, discountPrice, rating, inStock } = product;

  return (
    <div className="card bg-base-100 shadow-xl relative">
      {!inStock && (
        <span className="absolute top-2 right-2 badge badge-error">
          Out of Stock
        </span>
      )}
      <figure className="p-4">
        <img src={image} alt={name} className="w-32 h-32 object-contain" />
      </figure>
      <div className="card-body text-center">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-primary font-bold">
          ${price}{" "}
          {discountPrice && (
            <span className="text-gray-400 line-through">${discountPrice}</span>
          )}
        </p>
        <div className="rating">{"★".repeat(rating).padEnd(5, "☆")}</div>
        <div className="flex justify-center gap-4 mt-2">
          <button className="btn btn-outline btn-sm">
            <FaHeart className="text-red-500" />
          </button>
          {inStock && (
            <button className="btn btn-success btn-sm">
              <FaCartPlus className="text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
