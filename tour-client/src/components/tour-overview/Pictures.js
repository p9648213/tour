import Image from "next/image";

export default function Pictures({ tour }) {
  let renderPicture = tour.images.map((img, index) => {
    return (
      <div key={index} className="picture-box">
        <Image
          className={`picture-box__img picture-box__img--${index + 1}`}
          src={img}
          alt={`${tour.name} Tour ${index + 1}`}
          width={2000}
          height={1333}
          placeholder="empty"
        />
      </div>
    );
  });

  return <section className="section-pictures">{renderPicture}</section>;
}
