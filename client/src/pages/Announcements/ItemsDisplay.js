function ItemsDisplay(props) {
  const showItem = (item) => {
    return (
      <tr>
        <th>{item.id}</th>
        <td>
          <h3>{item.name}</h3>
        </td>
        <td>{item.type}</td>
      </tr>
    );
  };
  return (
    <div className="container">
      <div className="row">
        <h2>Announcement</h2>
      </div>
      <div className="row">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Announcement</th>
            </tr>
          </thead>
          <tbody> {props.items.map(showItem)}</tbody>
        </table>
      </div>
      {/* {props.items.map(showItem)} */}
    </div>
  );
} //map takes items in a list, and maps them to a function
//a function runs for each time, and you can return something

export default ItemsDisplay;
