import Link from "next/link";

const ArtistAsideContent = ({ ...item }) => {
  return (
    <>
      <div className="artist_info">
        <h2>{item.artist}</h2>
        <p>Republic of Korea</p>
        {item.born === 0 ? null : <p>{item.born}</p>}
      </div>
      <div className="artsist_address">
        <>
          Instagram / &nbsp;
          <p>
            {typeof item.Instagram === "string" ? (
              <>{item.Instagram}</>
            ) : (
              item.Instagram.map((insta: string, i: number) => (
                <span key={i}>
                  <Link
                    href={`https://www.instagram.com/${insta}/`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {insta}
                  </Link>
                </span>
              ))
            )}
          </p>
        </>
        {item.WebSite === "" ? null : (
          <p>
            Website /&nbsp;
            <Link
              href={`http://${item.WebSite}`}
              target="_blank"
              rel="noopener noreferrer">
              {item.WebSite}
            </Link>
          </p>
        )}
        {item.Email === "" ? null : <p>E-mail / {item.Email}</p>}
      </div>
    </>
  );
};

export default ArtistAsideContent;
