CREATE TABLE `tbl_api_log_request` (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `method` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'http method',
 `req_unique_id` char(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'request unique id',
 `url` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'url',
 `api_hit_time` datetime NOT NULL COMMENT 'api hit time',
 `req_data` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'req data',
 `req_headers` text COLLATE utf8mb4_unicode_ci COMMENT 'request headers',
 `ip` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'IP of the client',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='API service logs';

CREATE TABLE `tbl_api_log_response` (
 `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
 `req_unique_id` char(32) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'request unique id',
 `api_end_time` datetime NOT NULL COMMENT 'response end time',
 `req_total_time` int(10) unsigned NOT NULL COMMENT 'request total time in micro second',
 `res_data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'response body',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
