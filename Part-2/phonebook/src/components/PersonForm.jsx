const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  submit,
  addPerson,
}) => {
  return (
    <>
      <form>
        <div>
          Name: <input value={newName} onChange={setNewName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={setNewNumber} />
        </div>
        <div>
          <button type={submit} onClick={addPerson}>
            add
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonForm;
