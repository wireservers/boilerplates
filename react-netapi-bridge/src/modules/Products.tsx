import { useListQuery, useCreateMutation } from "../state/productsApi";
import { useForm } from "react-hook-form";

type FormData = { sku: string; name: string; price: number };

export function Products() {
  const { data, isLoading, isError } = useListQuery();
  const [create, { isLoading: creating }] = useCreateMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { sku: "", name: "", price: 0 } });

  const onSubmit = async (values: FormData) => {
    await create({ ...values, price: Number(values.price) }).unwrap();
    reset();
  };

  return (
    <div className="card">
      <h3>Products</h3>
      {isLoading && <p className="muted">Loading…</p>}
      {isError && <p className="muted">Failed to load.</p>}
      <ul>
        {data?.map((p) => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.sku} — ${p.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <div className="spacer" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label>SKU</label>
        <input {...register("sku", { required: "Required" })} />
        {errors.sku && (
          <div className="muted" role="alert">
            {errors.sku.message}
          </div>
        )}
        <div className="spacer" />
        <label>Name</label>
        <input {...register("name", { required: "Required" })} />
        {errors.name && (
          <div className="muted" role="alert">
            {errors.name.message}
          </div>
        )}
        <div className="spacer" />
        <label>Price</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Required",
            min: { value: 0, message: ">= 0" },
          })}
        />
        {errors.price && (
          <div className="muted" role="alert">
            {errors.price.message}
          </div>
        )}
        <div className="spacer" />
        <button className="btn" disabled={creating} type="submit">
          {creating ? "Saving…" : "Create"}
        </button>
      </form>
      <p className="muted">
        Update <code>baseUrl</code> in <code>productsApi.ts</code> to point to
        your ASP.NET Web API.
      </p>
    </div>
  );
}
