const Filter = ({ onFilterChange, filteredPersons }) => {
  return (
    <div>
      <p>
        filter shown with <input onChange={onFilterChange} />
      </p>
      {filteredPersons.map((person, i) => {
        return (
          <p key={i}>
            {person.name} : {person.number}
          </p>
        );
      })}
    </div>
  );
};

export default Filter;
