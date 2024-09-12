const PersonForm = ({
  addName,
  onNameChange,
  onNumberChange,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>debug : {newName}</div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
