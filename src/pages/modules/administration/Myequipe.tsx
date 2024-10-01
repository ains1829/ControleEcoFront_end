import { Image } from "antd";
import { usegetMyEquipe } from "../../../api/equipe/Apiequipe";

function Myequipe() {
  const usegetEquipe = usegetMyEquipe();
  if (usegetEquipe.isPending) {
    return<>loading...</>
  }
  if (usegetEquipe.isError) {
    return<>error...</>
  }
  console.log(usegetEquipe.data)
  return (
    <>
      <div className="content-equipe grid grid-cols-2 gap-5 text-sm font-sans">
        {
          usegetEquipe.data.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-5 border-b-2 border-dotted border-gray-100 p-5">
              <Image src={item.photo } alt="..." width={100} height={100} />
              <div className="flex flex-col gap-y-1 text-xs">
                <span>Nom : {item.nameadministration }</span>
                <span>Matricule : {item.matricule } {item.statustaff === 100 && <span className="ml-2 text-white font-bold rounded-full p-1 bg-red-400"># Chef d'equipe</span>} </span>
                <span className="text-blue-500">Email : {item.email }</span>
                <span className="font-bold">Profil : { item.profil}</span>
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
export default Myequipe;