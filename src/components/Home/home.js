import React, { useRef } from 'react';
import EnhancedTable  from '../Shared-Component/Tables/DataTable'
import ReactToPrint from 'react-to-print';
import { useReactToPrint } from "react-to-print";
import ExportPdfComponent from '../Shared-Component/Tables/ExportPdfComponent';
import TableComponent, { FunctionalComponentToPrint } from '../Shared-Component/Tables/TableComponent';
import dateRangePicker from '../Shared-Component/createButton,filters/dateRangePicker';
import DateRangePicker from '../Shared-Component/createButton,filters/dateRangePicker';

const Home = () => {
  const componentRef = React.useRef();
  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    console.log("sony", componentRef)
    return componentRef.current;
  }, [componentRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    // documentTitle: "AwesomeFileName",
    // onBeforeGetContent: handleOnBeforeGetContent,
    // onBeforePrint: handleBeforePrint,
    // onAfterPrint: handleAfterPrint,
    // removeAfterPrint: true
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);



 
  return (
    <div style={{margin:'30px'}}> 
      <h1>
      Home
      </h1>
    <DateRangePicker />


      <ExportPdfComponent/>

      {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
      <button onClick={handlePrint}>
        Print using a Functional Component with the useReactToPrint hook
      </button>
      <EnhancedTable ref={componentRef} />

      
    </div>
  )
}

export default Home
