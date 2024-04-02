"use server";

export async function classify(classificationData: any[], formData: FormData) {
  const parameter = formData.get("parameter");
  const dictionary = formData.get("dictionary");
  const newParameter = formData.get("newParameter");
  if (!parameter || !dictionary) throw new Error("Missing fields.");
  const candidates = classificationData.map(
    (data) => data[parameter.toString()]
  );
  console.log("candidates", candidates);
}
