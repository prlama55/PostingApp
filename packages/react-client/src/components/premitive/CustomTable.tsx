import React, {Component} from "react";
import MaterialTable from "material-table";
interface Props{
    title: string
    columns: any[],
    data: any[],
    onAdd: (newData: any) => Promise<any>;
    onRowUpdate:(newData: any, oldData?: any) => Promise<any>;
    onRowDelete:(oldData: any) => Promise<any>;
}

interface State {
    data: any[],
}
class CustomTable extends Component<Props, State>{
    constructor(props: Props) {
        super(props);
        this.state={
            data: props.data
        }
    }

    render(){
        const {title, columns, onAdd, onRowUpdate, onRowDelete} = this.props
        return (
            <MaterialTable
                style={{ boxShadow: 'none' }}
                title={title}
                columns={columns}
                data={this.state.data}
                editable={{
                    onRowAdd: onAdd,
                    onRowUpdate: onRowUpdate,
                    onRowDelete: onRowDelete,
                }}
            />
        );
    }
}

export default CustomTable
