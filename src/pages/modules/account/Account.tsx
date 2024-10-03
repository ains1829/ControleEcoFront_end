import Demande from "./components/Demande";
import Accountvalidate from "./components/Accountvalidate";

function Account() {
  return (
    <>
      <div className="flex flex-col gap-y-2 mt-3">
        <Demande />
        <Accountvalidate />
      </div>
    </>
  )
}
export default Account;