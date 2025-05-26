export default function Page({ params }: { params: { id: string } }) {
    return <div>ID phòng: {params.id}</div>;
}
