import { createItem } from "@/action/item";

export default function NewItemForm({ collection }: any) {
  if (!collection) {
    return <div>Collection not found</div>;
  }

  const customFields = [
    {
      type: "String",
      fields: [
        collection.customString1Name,
        collection.customString2Name,
        collection.customString3Name,
      ],
    },
    {
      type: "Int",
      fields: [
        collection.customInteger1Name,
        collection.customInteger2Name,
        collection.customInteger3Name,
      ],
    },
    {
      type: "Text",
      fields: [
        collection.customText1Name,
        collection.customText2Name,
        collection.customText3Name,
      ],
    },
    {
      type: "Boolean",
      fields: [
        collection.customBoolean1Name,
        collection.customBoolean2Name,
        collection.customBoolean3Name,
      ],
    },
    {
      type: "Date",
      fields: [
        collection.customDate1Name,
        collection.customDate2Name,
        collection.customDate3Name,
      ],
    },
  ];

  return (
    <form action={createItem} className="max-w-lg mx-auto mt-8">
      <input name="collectionId" type="hidden" value={collection.id} />

      <div className="mb-4">
        <label className="block mb-2" htmlFor="name">
          Name
        </label>
        <input
          required
          className="w-full px-3 py-2 border rounded"
          id="name"
          name="name"
          type="text"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2" htmlFor="tags">
          Tags (comma-separated)
        </label>
        <input
          className="w-full px-3 py-2 border rounded"
          id="tags"
          name="tags"
          placeholder="tag1, tag2, tag3"
          type="text"
        />
      </div>

      {customFields.map(({ type, fields }) =>
        fields.map((field, index) => {
          if (field) {
            return (
              <div key={`${type}_${index}`} className="mb-4">
                <label
                  className="block mb-2"
                  htmlFor={`custom_${type}_${index + 1}`}
                >
                  {field}
                </label>
                {type === "String" && (
                  <input
                    className="w-full px-3 py-2 border rounded"
                    id={`custom_${type}_${index + 1}`}
                    name={`custom_${type}_${index + 1}`}
                    type="text"
                  />
                )}
                {type === "Text" && (
                  <textarea
                    className="w-full px-3 py-2 border rounded"
                    id={`custom_${type}_${index + 1}`}
                    name={`custom_${type}_${index + 1}`}
                  />
                )}
                {type === "Boolean" && (
                  <input
                    id={`custom_${type}_${index + 1}`}
                    name={`custom_${type}_${index + 1}`}
                    type="checkbox"
                  />
                )}
                {type === "Date" && (
                  <input
                    className="w-full px-3 py-2 border rounded"
                    id={`custom_${type}_${index + 1}`}
                    name={`custom_${type}_${index + 1}`}
                    type="date"
                  />
                )}
                {type === "Int" && (
                  <input
                    className="w-full px-3 py-2 border rounded"
                    id={`custom_${type}_${index + 1}`}
                    name={`custom_${type}_${index + 1}`}
                    type="number"
                  />
                )}
              </div>
            );
          }

          return null;
        })
      )}

      <button
        className="px-4 py-2 bg-green-500 text-white rounded"
        type="submit"
      >
        Create Item
      </button>
    </form>
  );
}
