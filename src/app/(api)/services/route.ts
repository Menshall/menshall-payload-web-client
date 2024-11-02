import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";
import { Services } from "../../../../app-types";
import { Category } from "@/app-types";

export async function POST(request: NextRequest) {
  try {
    const { location, masterId, datetime, servicesString } =
      await request.json();

    const response = await fetchAltegio({
      url: `/book_services/${location}?staff_id=${masterId}&${datetime}${servicesString}`,
      method: "GET",
    });

    const services = response.services as Services;

    const categories: Array<Category> = await fetchAltegio({
      url: `/service_categories/${location}`,
      method: "GET",
    });

    const categoriesWithServices = categories.map((category) => {
      return {
        title: category.title,
        services: services.filter(
          (service) => service.category_id === category.id,
        ),
      };
    });

    const categoryWithServices = categoriesWithServices.filter(
      (c) => c.services.length > 0,
    );

    if (categoryWithServices) {
      return Response.json({ success: true, services: categoryWithServices });
    } else {
      new Error("Something went wrong. 1");
    }
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      // @ts-ignore
      error: error?.message,
    });
  }
  return NextResponse.json({
    success: false,
    error: "Fetch masters failed",
  });
}
