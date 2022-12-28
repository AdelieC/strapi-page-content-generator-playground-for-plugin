import React, { createContext, useContext, useMemo, useReducer } from "react";

const SectionsStateContext = createContext({});
const SectionsServiceContext = createContext({});

const reducer = (sections, action) => {
  let newSections;
  switch (action.type) {
    case "addSection":
      newSections = [...sections, action.newSection];
      action.changeJsonValue(newSections);
      return newSections;
    case "removeSection":
      newSections = sections.filter((s) => s.id !== action.id);
      action.changeJsonValue(newSections);
      return newSections;
    case "handleChange":
      newSections = sections.map((s) =>
        s.id === action.changedSection.id ? action.changedSection : s
      );
      action.changeJsonValue(newSections);
      return newSections;
    default:
      return sections;
  }
};

export const SectionsProvider = ({
  children,
  jsonValue,
  onChange,
  type,
  name
}) => {
  const [sections, dispatch] = useReducer(
    reducer,
    jsonValue ? JSON.parse(jsonValue) : []
  );

  const service = useMemo(() => {
    const changeJsonValue = (newSections) => {
      onChange({
        target: {
          name,
          value: JSON.stringify(newSections),
          type
        }
      });
    };

    const addSection = (newSection) => {
      dispatch({ type: "addSection", newSection, changeJsonValue });
    };

    const removeSection = (id) => {
      dispatch({ type: "removeSection", id, changeJsonValue });
    };

    const handleChange = (changedSection) => {
      dispatch({ type: "handleChange", changedSection, changeJsonValue });
    };

    return { addSection, removeSection, handleChange };
  }, []);

  return (
    <SectionsServiceContext.Provider value={service}>
      <SectionsStateContext.Provider value={{ sections }}>
        {children}
      </SectionsStateContext.Provider>
    </SectionsServiceContext.Provider>
  );
};

export const useSectionsServiceContext = () =>
  useContext(SectionsServiceContext);
export const useSectionsStateContext = () => useContext(SectionsStateContext);
