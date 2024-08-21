import { CellColor, CellType } from "@/types/maze.d";

const Legend = () => {
    return (
        <div className="react-flow__panel bg-gray-800 px-4 py-2 react-flow__controls top right">
            <h2>Legend</h2>
            <div>
                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: CellColor[CellType.Entrance] }}></div>
                    <div>{CellType.Entrance}</div>
                </div>

                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: CellColor[CellType.Exit] }}></div>
                    <div>{CellType.Exit}</div>
                </div>

                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: CellColor[CellType.Open] }}></div>
                    <div>{CellType.Open}</div>
                </div>

                <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: CellColor[CellType.Cheese] }}></div>
                    <div>{CellType.Cheese}</div>
                </div>
            </div>
        </div>
    )
}


export default Legend;