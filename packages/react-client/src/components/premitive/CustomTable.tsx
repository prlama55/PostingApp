import React, {Component} from "react";
import MaterialTable from "material-table";
interface Props{
    title: string
    columns: any[],
    data: any[],
}
class CustomTable extends Component<Props>{
    constructor(props: Props) {
        super(props);
    }

    render(){
        const {title, columns, data} = this.props
        return (
            <MaterialTable
                style={{ boxShadow: 'none' }}
                title={title}
                columns={columns}
                data={data}
                options={{
                    search: true,
                    exportButton: true
                }}
            />
        );
    }
}

export default CustomTable
