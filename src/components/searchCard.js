import { PropTypes } from 'prop-types';

function SearchCard(props) {
  const {
    id, title, url,
  } = props;
  return (
    <div className="searchcard">
      <div className="search-id" id={id}>{id}</div>
      <div className="search-title">
        {
          title.length > 25 ? `${title.substring(0, 25)}...` : title
        }
      </div>
      <div className="search-url">
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
        >
          [
          {url}
          ]
        </a>
      </div>
    </div>
  );
}

SearchCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
export default SearchCard;
