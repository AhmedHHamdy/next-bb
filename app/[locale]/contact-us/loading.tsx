import { Spin } from "antd";

export default function Loading() {
  return (
    <section className="min-h-screen flex items-center justify-center">
       <Spin size="large" />
    </section>
  )
}