"use client";

import {useMemo, useState} from "react";
import Link from "next/link";
import {useTranslations} from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {Input} from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {Button} from "@/components/ui/button";

import {Checkbox} from "@/components/ui/checkbox";

import {
  ArrowRight,
  CarFront,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {cn} from "@/lib/utils";

interface CarFilters {
  search: string;
  city: string;
  category: string;
  currency: string;
  maxPrice: number | null;
  featuredOnly: boolean;
  sort:
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "name";
}

interface HomeCarSearchProps {
  cities: string[];
  categories: string[];
  currencies: string[];
}

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "rating"
  | "newest"
  | "name";

const DEFAULT_SORT: SortOption = "featured";

export default function HomeCarSearch({
  cities,
  categories,
  currencies,
}: HomeCarSearchProps) {
  const t = useTranslations("home");
  const c = useTranslations("cars");

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [currency, setCurrency] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [featuredOnly, setFeaturedOnly] = useState(false);


  const carsUrl = useMemo(() => {
    const params = new URLSearchParams();

    const trimmedSearch =
      search.trim();

    if (trimmedSearch) {
      params.set(
        "search",
        trimmedSearch
      );
    }

    if (city) {
      params.set("city", city);
    }

    if (category) {
      params.set(
        "category",
        category
      );
    }

    if (currency) {
      params.set(
        "currency",
        currency
      );
    }

    if (
      currency &&
      maxPrice !== ""
    ) {
      const parsedPrice =
        Number(maxPrice);

      if (
        Number.isFinite(
          parsedPrice
        ) &&
        parsedPrice >= 0
      ) {
        params.set(
          "maxPrice",
          String(parsedPrice)
        );
      }
    }

    if (sort !== DEFAULT_SORT) {
      params.set("sort", sort);
    }

    if (featuredOnly) {
      params.set(
        "featured",
        "true"
      );
    }

    const query =
      params.toString();

    return query
      ? `/cars?${query}`
      : "/cars";
  }, [
    search,
    city,
    category,
    currency,
    maxPrice,
    sort,
    featuredOnly,
  ]);


  const clearFilters = () => {
    setSearch("");
    setCity("");
    setCategory("");
    setCurrency("");
    setMaxPrice("");
    setSort(DEFAULT_SORT);
    setFeaturedOnly(false);
  };

  const sortLabels: Record<CarFilters["sort"], string> = {
    featured: c("featuredFirst"),
    "price-low": c("lowestPrice"),
    "price-high": c("highestPrice"),
    rating: c("highestRated"),
    newest: c("newest"),
    name: c("alphabetical"),
  };



  return (
    <Card className=" w-full rounded-2xl border border-white/70 bg-background/95 shadow-xl backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="pb-2 pt-5 flex items-center gap-2">
          <span className=" flex h-10 w-10 items-center justify-center rounded-xl bg-k-primary  text-white">
            <CarFront
              className="h-5 w-5"
            />
          </span>
          {t("findYourPerfectCar")}
        </CardTitle>
      </CardHeader>


      <CardContent className="space-y-3 px-5 pb-5">

        {/* Search */}

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder={t("searchVehicle")}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* City */}

          <Select
            value={city || "all"}
            onValueChange={(value) => {
              if (value === null) {
                setCity("");
                return;
              }
              setCity(
                value === "all"
                  ? ""
                  : value
              );
            }
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {city || c("allCities")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                {t("allCities")}
              </SelectItem>

              {cities.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>


          {/* Category */}

          <Select
            value={category || "all"}
            onValueChange={(value) => {
              if (value === null) {
                setCategory("");
                return;
              }
              setCategory(
                value === "all"
                  ? ""
                  : value
              );
            }
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {category || c("allCategories")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                {t("allCategories")}
              </SelectItem>

              {categories.map(
                (item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        {/* Currency + Price */}

        <div
          className="grid grid-cols-2 gap-3">
          <Select
            value={currency || "all"}
            onValueChange={(value) => {
              if (value === null) {
                setCurrency("");
                return;
              }
              setCurrency(
                value === "all"
                  ? ""
                  : value
              );

              setMaxPrice("");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {currency || c("allCurrencies")}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                {t(
                  "allCurrencies"
                )}
              </SelectItem>

              {currencies.map(
                (item) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>


          <Input
            type="number"
            min={0}
            disabled={!currency}
            value={maxPrice}
            onChange={(event) =>
              setMaxPrice(
                event.target.value
              )
            }
            placeholder={
              currency
                ? t("maxPrice")
                : t(
                  "selectCurrencyFirst"
                )
            }
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Sort */}

          <Select
            value={sort}
            onValueChange={(value) =>
              setSort(
                value as SortOption
              )
            }
          >
            <SelectTrigger className="w-full">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  className="h-4 w-4"
                />
                <SelectValue>
                  {sortLabels[sort]}
                </SelectValue>
              </div>
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="featured">
                {c("featuredFirst")}
              </SelectItem>

              <SelectItem value="price-low">
                {c("lowestPrice")}
              </SelectItem>

              <SelectItem value="price-high">
                {c("highestPrice")}
              </SelectItem>

              <SelectItem value="rating">
                {c("highestRated")}
              </SelectItem>

              <SelectItem value="newest">
                {c("newest")}
              </SelectItem>

              <SelectItem value="name">
                {c("alphabetical")}
              </SelectItem>
            </SelectContent>
          </Select>


          {/* Featured */}

          <div className="flex items-center gap-2 w-full">
            <Checkbox
              id="home-featured"
              checked={
                featuredOnly
              }
              onCheckedChange={(
                checked
              ) =>
                setFeaturedOnly(
                  checked === true
                )
              }
            />

            <label
              htmlFor="home-featured"
              className="cursor-pointer text-sm text-muted-foreground">
              {c("featuredOnly")}
            </label>
          </div>
        </div>


        <div
          className={cn(
            "grid w-full gap-3",
            (search ||
              city ||
              category ||
              currency ||
              maxPrice ||
              sort !== DEFAULT_SORT ||
              featuredOnly)
              ? "grid-cols-2"
              : "grid-cols-1"
          )}
        >
          {/* Search */}
          <Link href={carsUrl} className="w-full">
            <Button
              className="
        h-8
        w-full
        rounded-sm
        bg-k-primary
        font-semibold
        text-white
        hover:bg-k-primary/90
      "
            >
              {t("searchVehicles")}
              <ArrowRight className="mr-2 h-5 w-5" />
            </Button>
          </Link>

          {/* Clear */}
          {(search ||
            city ||
            category ||
            currency ||
            maxPrice ||
            sort !== DEFAULT_SORT ||
            featuredOnly) && (
              <Button
                type="button"
                variant="ghost"
                size="lg"
                onClick={clearFilters}
                className="
        h-8
        w-full
        rounded-sm
        text-muted-foreground
      "
              >
                {t("clearFilters")}
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}