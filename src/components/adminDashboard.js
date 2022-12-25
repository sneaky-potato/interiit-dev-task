import { PropTypes } from 'prop-types';

function DashBoardList(props) {
  const {
    listData, currentSelection, setCurrentSelection,
  } = props;
  return (
    <div className="dashboard-list">
      {
        listData.map((listDataElement, index) => (
          <button
            key={index}
            type="button"
            className="dashboard-option"
            isselected={String(currentSelection === index)}
            onClick={() => { setCurrentSelection(index); }}
          >
            <div>{listDataElement}</div>
          </button>
        ))
      }
    </div>
  );
}

function AdminDashboard(props) {
  const {
    listData,
    currentSelection, setCurrentSelection,
  } = props;

  return (
    <div className="dashboard">
      <a
        className="dashboard-home-btn"
        href="/"
      >
        Home
      </a>
      <DashBoardList
        listData={listData}
        currentSelection={currentSelection}
        setCurrentSelection={setCurrentSelection}
      />
    </div>
  );
}

DashBoardList.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  currentSelection: PropTypes.number.isRequired,
  setCurrentSelection: PropTypes.func.isRequired,
};

AdminDashboard.propTypes = {
  listData: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  currentSelection: PropTypes.number.isRequired,
  setCurrentSelection: PropTypes.func.isRequired,
};

export default AdminDashboard;
