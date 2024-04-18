const SearchUser = () => {
  return (
    <form className="form-inline d-flex">
      <input
        className="form-control"
        type="search"
        placeholder="Serach By Brokerage Company"
        aria-label="Search"
        required
      />
      <button className="" disabled>
        <span className="flaticon-magnifying-glass"></span>
      </button>
    </form>
  );
};

export default SearchUser;
