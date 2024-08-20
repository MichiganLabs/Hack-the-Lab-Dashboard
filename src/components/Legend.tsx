import { ActionType, CategoryColor, CellColor, CellType } from "@/types/maze.d";

const Legend = () => {
    return (
        <div className="react-flow__panel react-flow__controls top right">
            <h2>Legend</h2>

            <h3>Cells</h3>
            <div>
                {Object.values(CellType).map((cellType) =>
                    <div key={cellType} className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: CellColor[cellType] }}></div>
                        <div>{cellType}</div>
                    </div>
                )}
            </div>

            <h3>Actions</h3>
            <div>
                {Object.values(ActionType).map((actionType) =>
                    <div key={actionType} className="flex items-center">
                        <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: CategoryColor[actionType] }}></div>
                        <div>{actionType}</div>
                    </div>
                )}
            </div>
        </div>
    )
}


export default Legend;