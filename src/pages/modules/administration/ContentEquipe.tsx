import Equipe from "./components/Equipe";

function ContentEquipe() {
  return (
    <>
      <div className="font-sans flex justify-between">
        <span className="text-xl font-bold mb-2" >Equipe.</span>
        <div>
          <span className="bg-secondary text-white text-xs p-2 shadow-xl rounded-full cursor-pointer">Nouveau equipe</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        <Equipe />
        <Equipe />
        <Equipe />
        <Equipe />
      </div>
    </>
  )
}
export default ContentEquipe;