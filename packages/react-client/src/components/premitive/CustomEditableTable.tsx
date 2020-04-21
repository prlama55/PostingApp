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
class CustomEditableTable extends Component<Props>{
    constructor(props: Props) {
        super(props);
    }

    render(){
        const {title, columns, onAdd, onRowDelete, data} = this.props
        return (
            <MaterialTable
                style={{ boxShadow: 'none' }}
                title={title}
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: onAdd,
                    // onRowUpdate: onRowUpdate,
                    onRowDelete: onRowDelete,
                }}
                options={{
                    search: true,
                    addRowPosition: 'first'
                }}
            />
        );
    }
}

export default CustomEditableTable
