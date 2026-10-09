import CollectionLayout from './CollectionLayout.jsx';

export default function TravelPage() {
  return (
    <CollectionLayout title="places i've been">
      <div className="travel-map-embed">
        <div className="travel-map-frame">
          <iframe
            title="Map of countries I've visited"
            src="https://www.fla-shop.com/visited-countries/embed/?st=AL%2CBA%2CBE%2CBS%2CCA%2CCN%2CES%2CFR%2CGB%2CGR%2CGU%2CHK%2CHR%2CIT%2CJO%2CJP%2CKH%2CKR%2CMC%2CMX%2CNL%2CPR%2CPT%2CTH%2CTN%2CTR%2CUS%2CVA%2CVN&vc=1ca032&uc=b3c3ca&hc=40bfa6&bc=ffffff"
            scrolling="no"
          />
        </div>
        <a href="https://www.fla-shop.com/visited-countries/">Create a map at Fla-shop.com</a>
      </div>
    </CollectionLayout>
  );
}