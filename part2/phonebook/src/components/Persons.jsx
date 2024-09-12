const Persons = ({ persons, deletePersonOf }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button
            onClick={() => {
              if (window.confirm(`Delete ${person.name} ?`)) {
                deletePersonOf(person.name, person.id);
              }
            }}
          >
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
