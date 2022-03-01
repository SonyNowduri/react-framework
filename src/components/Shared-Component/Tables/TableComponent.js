import { Tab } from "bootstrap";
import React from "react";

const TableComponent = React.forwardRef((props,ref) =>{
    return(
        <div ref={ref}>
        <table className="table">
     <thead>
       <tr>
         <th>Firstname</th>
         <th>Lastname</th>
         <th>Email</th>
         <th>Image</th>
       </tr>
     </thead>
     <tbody>
       <tr>
         <td>John</td>
         <td>Doe</td>
         <td>john@example.com</td>
         <td>
             <img src="https://i.pravatar.cc/50?img=1" alt="thumb" />
         </td>
       </tr>
       <tr>
         <td>Mary</td>
         <td>Moe</td>
         <td>mary@example.com</td>
         <td>
             <img src="https://i.pravatar.cc/50?img=2" alt="thumb" />
         </td>
       </tr>
       <tr>
         <td>July</td>
         <td>Dooley</td>
         <td>july@example.com</td>
         <td>
             <img src="https://i.pravatar.cc/50?img=3" alt="thumb" />
         </td>
       </tr>
     </tbody>
   </table>
 </div>
    )
})

TableComponent.displayName = 'TableComponent'


export default TableComponent