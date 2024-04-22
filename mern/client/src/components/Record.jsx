import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    sample: "",
    parameter: "",
    tresult: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      const response = await fetch(
        `http://localhost:5050/record/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
        // if the id is present, we will set the URL to /record/:id, otherwise we will set the URL to /record.
        const response = await fetch(`http://localhost:5050/record${params.id ? "/"+params.id : ""}`, {
          // if the id is present, we will use the PATCH method, otherwise we will use the POST method.
          method: `${params.id ? "PATCH" : "POST"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error('A problem occurred with your fetch operation: ', error);
      } finally {
        setForm({ name: "", sample:"", parameter: "", tresult: ""});
        navigate("/");
      }
    } 

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Enter test results here</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Test Results
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Kindly enter values of the parameters YOU have tested.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
            <div className="sm:col-span-4">
              <label
                htmlFor="sample"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Sample id
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="sample"
                    id="sample"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Ex - 101"
                    value={form.sample}
                    onChange={(e) => updateForm({ sample: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Parameter List</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="parameterpH"
                      name="positionOptions"
                      type="radio"
                      value="pH"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.parameter === "pH"}
                      onChange={(e) => updateForm({ parameter: e.target.value })}
                    />
                    <label
                      htmlFor="parameterpH"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      pH
                    </label>
                    <input
                      id="parameterConductivity"
                      name="positionOptions"
                      type="radio"
                      value="Conductivity"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.parameter === "Conductivity"}
                      onChange={(e) => updateForm({ parameter: e.target.value })}
                    />
                    <label
                      htmlFor="parameterConductivity"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Conductivity
                    </label>
                    <input
                      id="parameterResidualChlorine"
                      name="positionOptions"
                      type="radio"
                      value="Residual Chlorine"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.parameter === "Residual Chlorine"}
                      onChange={(e) => updateForm({ parameter: e.target.value })}
                    />
                    <label
                      htmlFor="parameterResidualChlorine"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Residual Chlorine
                    </label>
                    <input
                      id="parameterTurbidity"
                      name="positionOptions"
                      type="radio"
                      value="Turbidity"
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                      checked={form.parameter === "Turbidity"}
                      onChange={(e) => updateForm({ parameter: e.target.value })}
                    />
                    <label
                      htmlFor="parameterTurbidity"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Turbidity
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="tresult"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Result
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="tresult"
                    id="tresult"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="For ph : 6-8.5 etc"
                    value={form.tresult}
                    onChange={(e) => updateForm({ tresult: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <input
          type="submit"
          value="Save Test Results"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}