import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { PodcastService } from '../services/podcast.service';
import { AudioService } from '../services/audio.service';
import { FavouritesService } from '../services/favourites.service';
// import { OfflineService } from '../services/offline.service'; // may need
import { ToastService } from '../services/toast.service';
import { Description } from '../pipes/description.pipe';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faInfoCircle, faTh, faList } from '@fortawesome/free-solid-svg-icons';
import * as Store from 'electron-store';
import * as parsePodcast from 'node-podcast-parser';

@Component({
	selector: 'app-latest',
	templateUrl: './latest.component.html',
	styleUrls: ['./latest.component.css'],
	providers: [Description]
})
export class LatestComponent implements OnInit {
	private store = new Store();
	// public podcasts = [];
	// public amount: number;
	// public categories = [];
	// public category: String;
	// public regions = [];
	// public region: String;
	// public favs: string[];
	public latest: Array<Object> = [];
	public layout: string = "list";

	public faHeart = faHeart;
	public faInfoCircle = faInfoCircle;
	public faTh = faTh;
	public faList = faList;

	constructor(private audio: AudioService,
		// private route: ActivatedRoute,
		// private router: Router,
		private podcastService: PodcastService,
		private favService: FavouritesService,
		// private offlineService: OfflineService,
		private toast: ToastService,
		private descriptionPipe: Description) { }

	ngOnInit() {
		// this.amount = 50;
		// this.categories = this.podcastService.getCategories();
		// this.regions = this.podcastService.getRegions();
		this.layout = this.store.get("layout", "grid") as string;
		this.favService.favourites.subscribe(value => {
			const latest = [];
			value.forEach(item => {
				this.podcastService.getPodcastFeed(item['rss']).subscribe((response) => {
					parsePodcast(response, (error, data) => {
						if (error) {
							console.log('Latest Episode :: ' + error);
							this.toast.toastError("Something went wrong when fetching latest episodes.");
						} else {
							const episode = data.episodes[0];
							episode['podcastImage'] = data.image;
							episode['podcastTitle'] = data.title;
							episode['rss'] = item['rss'];
							latest.push(episode);
						}
					});
				});
			});
			this.latest = latest;
			console.log('latest', this.latest);
		});

		// //Listen for changes in URL parameters
		// this.route.paramMap.subscribe(params => {
		// 	this.region = params.get("region") || this.store.get("region", "us") as string;
		// 	this.category = params.get("category") || "26";
		// 	if (this.region && this.category) this.getPodcasts();
		// })
	}

	// getPodcastsNavigation = () => {
	// 	this.router.navigate(["/latest", { region: this.region, category: this.category }]);
	// }

	// getPodcasts = () => {
	// 	this.podcastService.getLatestlist(this.region, this.category, this.amount).subscribe((data) => {
	// 		this.podcasts = data['feed']['entry'];
	// 	});
	// }

	// addPodcast(id): void {
	// 	this.favService.addItunesFavourite(id);
	// }

	showDescription(title, description): void {
		this.toast.modal(title, this.descriptionPipe.transform(description));
	}

	// isFavourite = (title) => {
	// 	return this.favs.indexOf(title) !== -1;
	// };
}
