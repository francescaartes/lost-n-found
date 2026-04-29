import ImageCarousel from "./sections/ImageCarousel";
import ItemDetails from "./sections/ItemDetails";
import ContactCard from "./sections/ContactCard";

export default function ItemView({ item }: { item: any }) {
    return (
        <div className="space-y-6">
            <ImageCarousel images={item.images} />
            <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                    Description
                </h4>
                <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md border border-border">
                    {item.description}
                </p>
            </div>
            <ItemDetails item={item} />
            <ContactCard contactPreference={item.contactPreference} />
        </div>
    );
}
