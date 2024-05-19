function SuccessDisplay({ msg }) {
  return (
    <div className="font-bold p-3 h-10 text-xs py-3 px-6 bg-green-500 text-white shadow-lg rounded-lg flex justify-center items-center align-middle uppercase absolute top-10 left-10">
      {msg}
    </div>
  );
}

export default SuccessDisplay;
