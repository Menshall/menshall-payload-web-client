import { NextRequest, NextResponse } from "next/server";
import { fetchAltegio } from "../altegio";
import { Category, Service } from "@/app-types";
import { Services } from "../../../../app-types";

export async function POST(request: NextRequest) {
  try {
    const { location, datetime } = await request.json();
    const response = await fetchAltegio({
      url: `/book_services/${location}?staff_id=&datetime=${datetime}`,
      method: "GET",
    });

    const services = response.services as Services;

    const values: Array<{
      attributes: {
        is_bookable: boolean;
        bookable_status: string;
        duration: number;
        price_min: number;
        price_max: number;
      };
      id: string;
    }> = await fetchAltegio({
      url: `/booking/locations/${location}/search/services`,
      method: "GET",
    });

    const reduced = values.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: curr.attributes }),
      {},
    );

    const newServices: Services = services.map((s) => {
      return {
        ...s,
        seance_length: s.seance_length
          ? s.seance_length
          : //@ts-ignore
            reduced[String(s.id)].duration,
      } as Service;
    });

    const categories: Array<Category> = await fetchAltegio({
      url: `/service_categories/${location}`,
      method: "GET",
    });

    const categoriesWithServices = categories.map((category) => {
      return {
        title: category.title,
        services: newServices.filter(
          (service) => service.category_id === category.id,
        ),
      };
    });

    const categoryWithServices = categoriesWithServices.filter(
      (c) => c.services.length > 0,
    );

    return Response.json({
      success: true,
      services: categoryWithServices,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      success: false,
      // @ts-ignore
      error: error?.message,
    });
  }
  return NextResponse.json({
    success: false,
    error: "Fetch categories failed",
  });
}
